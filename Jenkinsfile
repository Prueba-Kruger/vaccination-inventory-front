pipeline {
    agent none
    options {
        disableConcurrentBuilds()
    }
    environment {
        PROJECT_NAME = 'vaccination-inventory-front'
        REGISTRY_TOKEN = credentials('registry-token')
        ARTIFACTORY_TOKEN = credentials('artifactory-token')
        SONAR_TOKEN = credentials('sonar-token')
        DOCKER_STACK_NAME = 'vaccination-inventory-front'
    }
    stages {
        stage('Starting Test') {
            agent {
                docker {
                    image 'node:lts'
                    label 'docker'
                }
            }
            stages {
                stage('Install Dependencies') {
                    steps {
                        sh 'apt-get update'
                        sh 'apt-get install -y chromium'
                        sh 'npm i'
                    }
                }
                stage('Static Analysis') {
                    steps {
                        sh 'npm run ng lint'
                    }
                }
                // stage('Vulnerabilities Analysis') {
                //     steps {
                //         sh 'npm audit'
                //     }
                // }

                // descomentar
                  stage('Unit Test') {
                    steps {
                        sh 'npm run ng test -- --code-coverage'
                    }
                    post {
                        always {
                            publishHTML target: [
                                    allowMissing         : false,
                                    alwaysLinkToLastBuild: false,
                                    keepAll              : true,
                                    reportDir            : 'coverage',
                                    reportFiles          : 'index.html',
                                    reportName           : 'Coverage Report'
                            ]
                        }
                    }
                }


                stage('Build Application') {
                    steps {
                        sh 'npm run ng build --prod'
                    }
                }
                stage('Stash Files') {
                    when {
                        anyOf {
                            branch 'develop'
                            branch 'hotfix/**'
                            branch 'feature/**'
                        }
                    }
                    steps {
                        stash includes: 'node_modules/', name: 'node_modules'
                        stash includes: 'coverage/', name: 'coverage'
                        stash includes: 'dist/', name: 'build'
                    }
                }
            }
        }
        stage('SSL Certificate') {
            agent {
                docker {
                    image 'openjdk:8-jre'
                    label 'docker'
                }
            }
            when {
                anyOf {
                    branch 'develop'
                    branch 'hotfix/**'
                    branch 'feature/**'
                }
            }
            steps {
                sh 'mkdir -p certs'
                sh 'openssl req -new -newkey rsa:4096 -days 3650 -x509 -subj "/CN=AlquimiaSoft-CA" -keyout certs/$PROJECT_NAME.key -out certs/$PROJECT_NAME.cert -nodes'
                stash includes: 'certs/', name: 'certs'
            }
        }
        stage('Publish to Registry') {
            agent {
                docker {
                    label 'docker'
                    image 'docker:19.03'
                }
            }
            when {
                    branch 'develop'
            }
            steps {
                unstash 'build'
                unstash 'certs'

                sh 'docker login $REGISTRY_DNS -u $REGISTRY_USER -p $REGISTRY_TOKEN'
                sh 'docker build -t $REGISTRY_DNS/$PROJECT_NAME:latest -t $REGISTRY_DNS/$PROJECT_NAME:$GIT_COMMIT .'
                sh 'docker push $REGISTRY_DNS/$PROJECT_NAME:latest'
                sh 'docker push $REGISTRY_DNS/$PROJECT_NAME:$GIT_COMMIT'
            }
        }
        stage('Publish to Registry Feature/Hotfix Branches') {

            agent {
                docker {
                    label 'docker'
                    image 'docker:19.03'
                }
            }

            when {
                anyOf {
                    branch 'hotfix/**'
                    branch 'feature/**'
                }
            }
            environment {
                DOCKER_TAG = "${GIT_BRANCH}".replaceAll("/", "-")
            }

            steps {
              unstash 'build'
              unstash 'certs'

              sh 'docker login $REGISTRY_DNS -u $REGISTRY_USER -p $REGISTRY_TOKEN'
              sh 'docker build -t $REGISTRY_DNS/$PROJECT_NAME:$DOCKER_TAG -t $REGISTRY_DNS/$PROJECT_NAME:$GIT_COMMIT .'
              sh 'docker push $REGISTRY_DNS/$PROJECT_NAME:$DOCKER_TAG'
              sh 'docker push $REGISTRY_DNS/$PROJECT_NAME:$GIT_COMMIT'
            }
        }
        stage('Deploy to Integration') {
            agent { label 'int' }
            when {
                  branch 'develop'
            }
            steps {
                sh 'docker login $REGISTRY_DNS -u $REGISTRY_USER -p $REGISTRY_TOKEN'
                sh 'docker stack deploy --with-registry-auth -c docker-compose.local.yml -c docker-compose.int.yml $PROJECT_NAME'
                sh 'docker stack ps $PROJECT_NAME'
            }
        }
        stage('Tagging Release Image') {
            agent { label 'docker' }

            when {
                branch 'master'
            }
            environment {
                GIT_TAG = """${
                    sh(
                            returnStdout: true,
                            script: 'git tag --sort version:refname --points-at $GIT_COMMIT | grep release | tail -n1'
                    )
                }"""
            }
            steps {
                sh '[ -z "$GIT_TAG" ] && echo "Error: Tag not found" && exit 1 || echo "Tag: $GIT_TAG"'
                sh 'docker login $REGISTRY_DNS -u $REGISTRY_USER -p $REGISTRY_TOKEN'
                sh 'docker pull $REGISTRY_DNS/$PROJECT_NAME:$GIT_COMMIT'
                sh 'docker tag $REGISTRY_DNS/$PROJECT_NAME:$GIT_COMMIT $REGISTRY_DNS/$PROJECT_NAME:$GIT_TAG'
                sh 'docker push $REGISTRY_DNS/$PROJECT_NAME:$GIT_TAG'
            }
        }
        stage('Deploy to Production') {
            agent { label 'mega-services' }
            when {
                branch 'master'
            }
            environment {
                GIT_TAG = """${
                    sh(
                            returnStdout: true,
                            script: 'git tag --sort version:refname --points-at $GIT_COMMIT | grep release | tail -n1'
                    )
                }"""
            }
            steps {
                sh 'docker login $REGISTRY_DNS -u $REGISTRY_USER -p $REGISTRY_TOKEN'
                sh 'make update-tag GIT_TAG=$GIT_TAG'
                sh 'docker stack deploy --with-registry-auth -c docker-compose.prod.yml $DOCKER_STACK_NAME'
                sh 'docker stack ps $DOCKER_STACK_NAME'
            }
        }
    }
}


