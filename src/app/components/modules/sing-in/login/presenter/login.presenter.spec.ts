import { Observable } from 'rxjs';
import { LoginPresenter } from './login.presenter';

describe('login.presenter contains logic for login', () => {


    beforeEach(async () => {


    });

    it('acceptLoging !user  ', () => {
        const userService = jasmine.createSpyObj('UserService', ['doLoginRest']);
        const loginView = jasmine.createSpyObj('LoginView', ['redirectTo', 'user', 'password', 'showError', 'allowUi', 'blockUi', 'showMessage']);
        const loginPresenter = new LoginPresenter(userService);
        loginPresenter.view = loginView;
        loginPresenter.view.password = 'fjhghjkj!';

        loginPresenter.acceptLoging();

        expect(loginPresenter.view.showMessage).toHaveBeenCalled();
    });
    it('acceptLoging user === 0  ', () => {
        const userService = jasmine.createSpyObj('UserService', ['doLoginRest']);
        const loginView = jasmine.createSpyObj('LoginView', ['redirectTo', 'user', 'password', 'showError', 'allowUi', 'blockUi', 'showMessage']);
        const loginPresenter = new LoginPresenter(userService);
        loginPresenter.view = loginView;
        loginPresenter.view.user = '';
        loginPresenter.view.password = 'fjhghjkj!';

        loginPresenter.acceptLoging();

        expect(loginPresenter.view.showMessage).toHaveBeenCalled();
    });
    it('acceptLoging !password  ', () => {
        const userService = jasmine.createSpyObj('UserService', ['doLoginRest']);
        const loginView = jasmine.createSpyObj('LoginView', ['redirectTo', 'user', 'password', 'showError', 'allowUi', 'blockUi', 'showMessage']);
        const loginPresenter = new LoginPresenter(userService);
        loginPresenter.view = loginView;
        loginPresenter.view.user = 'fjhghjkj!';

        loginPresenter.acceptLoging();

        expect(loginPresenter.view.showMessage).toHaveBeenCalled();
    });
    it('acceptLoging password === 0  ', () => {
        const userService = jasmine.createSpyObj('UserService', ['doLoginRest']);
        const loginView = jasmine.createSpyObj('LoginView', ['redirectTo', 'user', 'password', 'showError', 'allowUi', 'blockUi', 'showMessage']);
        const loginPresenter = new LoginPresenter(userService);
        loginPresenter.view = loginView;
        loginPresenter.view.user = 'fjhghjkj!';
        loginPresenter.view.password = '';

        loginPresenter.acceptLoging();

        expect(loginPresenter.view.showMessage).toHaveBeenCalled();
    });




    it('acceptLoging should be used accept Loging ', () => {
        const userService = jasmine.createSpyObj('UserService', ['doLoginRest']);
        const loginView = jasmine.createSpyObj('LoginView', ['redirectTo', 'user', 'password', 'showError', 'allowUi', 'blockUi']);
        const loginPresenter = new LoginPresenter(userService);
        loginPresenter.view = loginView;
        loginPresenter.view.user = 'fghfhg';
        loginPresenter.view.password = 'fjhghjkj!';
        const response = {
            token: 'eyJyb2xlcyI6W10sInR5cCI6IkpXVCIsImFsZyI6IkhTMjU2In0'
        };

        userService.doLoginRest.and.returnValue(new Observable(res => {
            res.next(response);
        }));
        loginPresenter.acceptLoging();
        expect(loginPresenter.view.redirectTo).toHaveBeenCalled();
    });
    it('acceptLoging should be used accept Loging Error', () => {
        const userService = jasmine.createSpyObj('UserService', ['doLoginRest']);
        const loginView = jasmine.createSpyObj('LoginView', ['redirectTo', 'user', 'password', 'showError', 'allowUi', 'blockUi']);
        const loginPresenter = new LoginPresenter(userService);
        loginPresenter.view = loginView;
        loginPresenter.view.user = 'fghfhg';
        loginPresenter.view.password = 'fjhghjkj!';
        userService.doLoginRest.and.returnValue(new Observable(res => {
            res.error({ error: { message: 'asf' } });
        }));
        loginPresenter.acceptLoging();
        expect(loginPresenter.view.showError).toHaveBeenCalled();
    });

});
