# antd UI库的使用

// index.js
```js
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import { Form, Card, Input, Radio, Select,Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

interface BasicFormProps {
  submitting: boolean;
  dispatch: Dispatch<any>
}

const BasicForm: FC<BasicFormProps> = (props) => {
  const { submitting } = props;
  const [form] = Form.useForm();
  const [showPublicUsers, setShowPublicUsers] = React.useState(false);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };

  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 10, offset: 7 },
    },
  };


  const onFinish = (values: { [key: string]: any }) => {
    const { dispatch } = props;
    dispatch({
      type: 'formAndbasicForm/submitRegularForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues: { [key: string]: any }) => {
    const { publicType } = changedValues;
    if (publicType) setShowPublicUsers(publicType === '2');
  };

  return <PageHeaderWrapper content={'头部内容'}>
    <Card bordered={false}>
      <Form
        hideRequiredMark
        style={{ marginTop: 8 }}
        form={form}
        name="basic"
        initialValues={{ publicType: '1' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
      >
        <FormItem
          {...formItemLayout}
          label={'名字'}
          name="title"
          rules={[
            {
              required: true,
              message: '请输入姓名',
            },
          ]}
        >
          <Input placeholder={'请输入姓名'} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={'测试'}
          name="publicType"
        >
          <Input.Group compact>
            <div>
            <div>
              <Form.Item
                name={'publicType'}
                noStyle
                rules={[{ required: true, message: 'Province is required' }]}
              >
                <Radio.Group>
                  <Radio value="1">
                    public
                </Radio>
                  <Radio value="2">
                    partially-public
                </Radio>
                  <Radio value="3">
                    private
                </Radio>
                </Radio.Group>
              </Form.Item>
            </div>

            <div>
              <FormItem style={{ marginBottom: 0 }} name="publicUsers">
                <Select
                  mode="multiple"
                  placeholder={'测试'}
                  style={{
                    margin: '8px 0',
                    display: showPublicUsers ? 'block' : 'none',
                  }}
                >
                  <Option value="1">
                    Option1
                </Option>
                  <Option value="2">
                    Option2
                </Option>
                  <Option value="3">
                    Option3
                </Option>
                </Select>
              </FormItem>
            </div>
            </div>
          </Input.Group>
        </FormItem>

        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
                提交
            </Button>
            <Button style={{ marginLeft: 8 }}>
                保存
            </Button>
          </FormItem>
      </Form>
    </Card>
  </PageHeaderWrapper>
}


export default connect(
  ({ loading }:{loading: { effects: { [key: string]: boolean } } }) => ({ submitting: loading.effects['formAndbasicForm/submitRegularForm'] }),
)(BasicForm)
```


// model.ts
```js
import { Effect } from 'umi';
import { message } from 'antd';
import {fakeSubmitForm} from './service';

export interface ModelType {
  namespace: string;
  state: {};
  effects: { 
    submitRegularForm: Effect;
  }
}

const Model: ModelType = {
  namespace: 'formAndbasicForm',
  state: {},
  effects: {
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功!');
      return false
    }
  }
}

export default Model
```

//serve.ts

```js

import request from 'umi-request';

export async function fakeSubmitForm(params: any) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}


```
