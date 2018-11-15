import { helper } from '@ember/component/helper';

export function customConcat(params) {
  let temp='';
  params.forEach(param=>temp+=param);
  return temp;
}

export default helper(customConcat);
