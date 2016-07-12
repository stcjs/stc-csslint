import Plugin from 'stc-plugin';
import {extend} from 'stc-helper';
import {CSSLint} from 'csslint';
import defaultOptions from './default_options.js';

let options = null;
/**
 * Use csslint to verify code
 */
export default class CSSLintPlugin extends Plugin {
  /**
   * run
   */
  async run(){
    if(!options){
      options = extend({}, defaultOptions);
      options = extend(options, this.options);
    }
    let content = await this.getContent('utf8');
    var report = CSSLint.verify(content, options);
    return {messages : report.messages};
  }
  /**
   * update
   */
  update(data){
    let logMethod = {
      'error': 'error',
      'warning': 'warning',
      'info': 'notice'
    }
    data.messages.forEach((message, i) => {
      if(logMethod.hasOwnProperty(message.type)){
        this[logMethod[message.type]](`${message.message}` ,message.line,message.col);
      }else {
        this.error(`${message.message}` ,message.line,message.col);
      }
    });
  }
  /**
   * use cluster
   */
  static cluster(){
    return false;
  }
  /**
   * enable cache
   */
  static cache(){
    return false;
  }
  /**
   * set default include file
   */
   static include() {
     return /\.*$/i;
   }
}