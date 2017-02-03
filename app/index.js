var Generator = require('yeoman-generator');
var slugify = require('slugify');
const validators = {
  notnull : function(input){
     return !!input;
  },
  startsWithCaps : function(input){
     return !!input.match(/^[_A-Z]+[A-z_0-9a-z]*$/);
  }
}
module.exports = class extends Generator {
  constructor(args,opts){
    super(args,opts);
    this.option('babel');
  }
  initializing(){
    return new Promise(function(res,rej){
        this.config.set('author',this.user.git.name() || '');
        this.config.set('email',this.user.git.email() || '');
        this.user.github.username(function(err,username){
          if(err){
            rej(err);
          }else{
            this.config.set('github_username',username);
            res(username);
          }
        }.bind(this));
    }.bind(this));
  }
  prompting() {
    var self = this;
    var defaults = {
       'appname' : slugify(this.appname),
       'description' : 'Accessible react component',
       'author' : this.config.get('author') ,
       'email' : this.config.get('email') ,
       'github_username' : this.config.get('github_username'),
       'root_component_name' : 'MyComponent',
       'confirm_generate_license' : true
    }

    return this.prompt([{
      type    : 'input',
      name    : 'appname',
      message : 'Your project name',
      default :  defaults['appname'] // Default to current folder name
    },{
      type    : 'input',
      name    : 'description',
      message : 'Your project description',
      default : defaults['description']// Default to current folder name
    },{
      type    : 'input',
      name    : 'author',
      message : 'Your name',
      default : defaults['author'], // Default to current folder name,
      validate : validators.notnull
    },{
      type    : 'input',
      name    : 'email',
      message : 'Your email',
      default : defaults['email'], // Default to current folder name,
      validate : validators.notnull
    },{
      type    : 'input',
      name    : 'github_username',
      message : 'Your github username',
      default :  defaults['github_username'], // Default to current folder name
      validate : validators.notnull
    },{
      type    : 'input',
      name    : 'root_component_name',
      message : 'Class name of the component ',
      default : defaults['root_component_name'], // Default to current folder name
      validate : validators.startsWithCaps
    },{
      type    : 'confirm',
      name    : 'confirm_generate_license',
      message : 'Generate MIT license?',
      default : defaults['confirm_generate_license'] // Default to current folder name
    }]).then((answers) => {
      this.config.set('appname',answers.appname);
      this.config.set('author',answers.author);
      this.config.set('email',answers.email);
      this.config.set('github_username',answers.github_username);
      this.config.set('confirm_generate_license',answers.confirm_generate_license);
      if(answers.confirm_generate_license){
        this.config.set('license','MIT');
      }else{
        this.config.set('license','');
      }
      this.config.set('description',answers.description);
      this.config.set('root_component_name',answers.root_component_name);
    });
  }
  writing() {
    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    );
    this.fs.copyTpl(
      this.templatePath('.eslintrc'),
      this.destinationPath('.eslintrc')
    );
    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copyTpl(
      this.templatePath('.travis.yml'),
      this.destinationPath('.travis.yml')
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        appname : this.config.get('appname'),
        author : this.config.get('author'),
        license : this.config.get('license'),
        description : this.config.get('description')
      }
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        appname : this.config.get('appname'),
        description : this.config.get('description'),
        license : this.config.get('license'),
        github_username : this.config.get('github_username')
      }
    );
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      {
        appname : this.config.get('appname')
      }
    );
    this.fs.copyTpl(
      this.templatePath('test/index.js'),
      this.destinationPath('test/index.js'),
      {
        root_component_name : this.config.get('root_component_name')
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/index.js'),
      this.destinationPath('src/index.js'),
      {
        root_component_name : this.config.get('root_component_name')
      }
    );

    this.fs.copyTpl(
      this.templatePath('playground/main.js'),
      this.destinationPath('playground/main.js'),
      {
        root_component_name : this.config.get('root_component_name')
      }
    );

    this.fs.copyTpl(
      this.templatePath('playground/template.html'),
      this.destinationPath('playground/template.html'),
      {
        root_component_name : this.config.get('root_component_name')
      }
    );

    if(this.config.get('confirm_generate_license')){
      var year = (new Date()).getFullYear();
      var yearStr = year+'-'+(year+1)%100;
      this.fs.copyTpl(
        this.templatePath('LICENSE'),
        this.destinationPath('LICENSE'),
        {
          author : this.config.get('author'),
          email : this.config.get('email'),
          yearStr : yearStr
        }
      );
    }

  }
  installingWebpack(){
    this.yarnInstall();
  }
  myAction(){
    this.log('done');
  }
};
