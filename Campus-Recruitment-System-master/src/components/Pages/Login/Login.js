import React, { useState } from 'react';

// IMPORTS..
import { Form, Select, Input, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';

import { login, getUser, currentUser,getMemberData } from '../../../store/action/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../Layout/Loader/Loader';

// SCSS..
import classes from './login.module.scss';

const Login = () => {
  const [accountType, setAccountType] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [companyEmail, setcCmpanyEmail] = useState('');
  const [companyPassword, setCompanyPassword] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const dispatch = useDispatch();

  const history = useHistory();
  const errorMessage = useSelector((state) => state.authReducer.errorMessage);
  const user = useSelector((state) => state.authReducer.myUser)
  const { Option } = Select;
  React.useEffect(() => {
    if (user) {
      dispatch(getMemberData())
    }
  })


  useSelector((state) => {
    if (state.authReducer.currentUser && isLoading) {
      setIsloading(false);
      history.push('/');
    }
  });

  const handleDropDown = (e) => {
    setAccountType(e);
  };

  const onFinish = async () => {
    let companyEmailpassword = {
      email: companyEmail,
      password: companyPassword,
    }
    let studentEmailPassword = {
      email: studentEmail,
      password: studentPassword
    }
    // dispatch(getUser());

    if (accountType === "company") {
      setIsloading(true);
      dispatch(login(companyEmailpassword, accountType));
    }
    else {
      setIsloading(true);
      dispatch(login(studentEmailPassword))
    }
  };

  return (
    <React.Fragment>
      {isLoading && !errorMessage ? (
        <Loader />
      ) : (
          <div className={classes.Login}>
            <div className={classes.loginBox}>
              <div className={classes.welcomText}>
                <h3>
                  Welcome <span>To the best CR system</span>
                </h3>

                <Select
                  className={classes.dropDown}
                  placeholder="Login As"
                  onChange={handleDropDown}
                  allowClear
                >
                  <Option value="student">Login As Student</Option>
                  <Option value="company">Login As Company</Option>
                </Select>
              </div>
              {errorMessage ? (
                <div className="alert alert-warning input100 alert-dismissible show">
                  <h4 className="alert-heading">
                    <FontAwesomeIcon icon={faExclamationTriangle} /> Warning!
                </h4>
                  <p>{errorMessage ? errorMessage : 'Login Failed'}</p>
                </div>
              ) : (
                  <div></div>
                )}
              {accountType === 'student' ? (
                <Form className={classes.LoginForm} onFinish={onFinish}>
                  <label htmlFor="email">Email</label>
                  <Form.Item
                    className={classes.formItem}
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!',
                      },
                    ]}
                  >
                    <Input
                      className={classes.formItem}
                      name="email"
                      placeholder="Email"
                      type="email"
                      onChange={(e) => setStudentEmail(e.target.value)}
                      value={studentEmail}
                    />
                  </Form.Item>

                  <label htmlFor="password">Password</label>
                  <Form.Item
                    className="form-item-antd"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input.Password
                      className={classes.inputs}
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setStudentPassword(e.target.value)}
                      value={studentPassword}
                    />
                  </Form.Item>

                  <Button className={classes.subBtn} htmlType="submit">
                    Login with student
                </Button>
                </Form>
              ) : accountType === 'company' ? (
                <Form className={classes.LoginForm} onFinish={onFinish}>
                  <label htmlFor="email">Email</label>
                  <Form.Item
                    className={classes.formItem}
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                  >
                    <Input
                      className={classes.inputs}
                      name="email"
                      placeholder="Email"
                      type="email"
                      onChange={(e) => setcCmpanyEmail(e.target.value)}
                      value={companyEmail}
                    />
                  </Form.Item>

                  <label htmlFor="password">Password</label>
                  <Form.Item
                    className={classes.formItem}
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                  >
                    <Input.Password
                      className={classes.inputs}
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setCompanyPassword(e.target.value)}
                      value={companyPassword}
                    />
                  </Form.Item>
                  <Button className={classes.subBtn} htmlType="submit">
                    Login with company
                </Button>
                </Form>
              ) : null}

              <div className={classes.bottomText}>
                <p>
                  Not registered? <Link to="/register">Create an account</Link>
                </p>
              </div>
            </div>
          </div>
        )}
    </React.Fragment>
  );
};

export default Login;
