
import { ICreatemessageState } from './createMessage'

var validate = require("validate.js");

const constraints : Record<keyof ICreatemessageState, any> = {
  title: {
    presence: true,
    length: {
      minimum: 5,
      maximum: 20,
      message: "^标题长度 5 - 20"
    }
  },
  description:{
    presence: true,
    length: {
      minimum: 5,
      maximum: 150,
      message: "^标题长度 5 - 20"
    }
  },
  dateSel: {
    presence: true,
  },
  phoneNumber: {
    presence: true,
    format: {
      pattern: /^1[3456789]\d{9}$/,
      message: "^手机号格式错误"
    }
  },
  status: {
    presence: true,
  },
  files: {},
  lat: {
    presence: true,
  },
  lng: {
    presence: true,
  },
};

export default (data: ICreatemessageState) => validate(data, constraints)
