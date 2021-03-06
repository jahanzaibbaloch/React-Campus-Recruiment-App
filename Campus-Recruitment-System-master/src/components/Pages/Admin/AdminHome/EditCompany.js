import React, { useState, useEffect } from 'react';

// IMPORTS...
import { Form, Input, Button, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { update_user, updateAccount, updateDataGet, company_updated } from '../../../../store/action/index';

import classes from './adminHome.module.scss';

const EditCompany = (props) => {
  const initialState = {
    companyName: '',
    companyType: '',
    companyLocation: '',
    companyEmail: '',
    companyPassword: '',
    isEdit: false,
    isLoading: true,
  };
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  let editData = useSelector((state) => state.companyReducer.singleData)
  console.log(editData)
  if (editData !== false && !state.isEdit) {
    setState({
      ...state,
      isEdit: true,
      isLoading: false,
      companyEmail: editData.data.companyEmail,
      companyLocation: editData.data.companyLocation,
      companyName: editData.data.companyName,
      companyPassword: editData.data.companyPassword,
      companyType: editData.data.companyType,
    })
  }

  useEffect(() => {
    dispatch(updateDataGet(id));
  }, [id, dispatch]);

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const onFinish = () => {
    const companyData = {
      companyEmail: state.companyEmail,
      companyLocation: state.companyLocation,
      companyName: state.companyName,
      companyPassword: state.companyPassword,
      companyType: state.companyType,
    };

    dispatch(updateAccount(companyData, id));
    history.push('/adminIndex/admincompany');
  };

  return (
    <React.Fragment>
      {state.isLoading ? (
        <Skeleton active />
      ) : (
          <Form className={classes.registerForm} onFinish={onFinish} initialValues={{ ...state }}>
            <label htmlFor="companyName">Company Name</label>
            <Form.Item
              className={classes.formItem}
              name="companyName"
              rules={[
                {
                  required: true,
                  message: 'Please input your CompanyName!',
                },
              ]}
            >
              <Input
                className={classes.inputs}
                name="companyName"
                placeholder="companyName"
                type="text"
                onChange={handleInputChange}
                value={state.companyName}
              />
            </Form.Item>

            <label htmlFor="companyType">Company type</label>

            <Form.Item
              className={classes.formItem}
              name="companyType"
              rules={[
                {
                  required: true,
                  message: 'Please input your Company type!',
                },
              ]}
            >
              <Input
                className={classes.inputs}
                name="companyType"
                placeholder={'Company type'}
                type="text"
                onChange={handleInputChange}
                value={state.companyType}
              />
            </Form.Item>

            <label htmlFor="companyType">Company location</label>
            <Form.Item
              className={classes.formItem}
              name="companyLocation"
              rules={[
                {
                  required: true,
                  message: 'Please input your Company location!',
                },
              ]}
            >
              <Input
                className={classes.inputs}
                name="companyLocation"
                placeholder={'Company location'}
                type="text"
                onChange={handleInputChange}
                value={state.companyLocation}
              />
            </Form.Item>

            <label htmlFor="Email">Email</label>
            <Form.Item
              className={classes.formItem}
              name="companyEmail"
              rules={[
                {
                  required: true,
                  message: 'Please input your  Email!',
                },
              ]}
            >
              <Input
                className={classes.inputs}
                name="companyEmail"
                placeholder="Email"
                type="email"
                onChange={handleInputChange}
                value={state.companyEmail}
              />
            </Form.Item>

            <Button className={classes.subBtn} htmlType="submit">
              Submit
          </Button>
          </Form>
        )}
    </React.Fragment>
  );
};

export default EditCompany;
