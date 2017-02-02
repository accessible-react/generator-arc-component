var Generator = require('yeoman-generator');
var slugify = require('slugify');
module.exports = class extends Generator {
  constructor(args,opts){
    super(args,opts);
    this.option('babel');
  }
  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : slugify(this.appname) // Default to current folder name
    },{
      type    : 'input',
      name    : 'description',
      message : 'Your project description',
      default : 'Accessible react component'// Default to current folder name
    },{
      type    : 'input',
      name    : 'author',
      message : 'Your name',
      default : '' // Default to current folder name
    },{
      type    : 'input',
      name    : 'license',
      message : 'LICENSE',
      default : 'IST' // Default to current folder name
    }]).then((answers) => {
      this.config.set('name',answers.name);
      this.config.set('author',answers.author);
      this.config.set('license',answers.license);
      this.config.set('description',answers.description);
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
        appname : this.config.get('name'),
        author : this.config.get('author'),
        license : this.config.get('license'),
        description : this.config.get('description')
      }
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        appname : this.config.get('name'),
        description : this.config.get('description')
      }
    );
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      {
        appname : this.config.get('name')
      }
    );
    this.fs.copyTpl(
      this.templatePath('test/index.js'),
      this.destinationPath('test/index.js')
    );
    this.fs.copyTpl(
      this.templatePath('src/index.js'),
      this.destinationPath('src/index.js')
    );

    this.fs.copyTpl(
      this.templatePath('dev/main.js'),
      this.destinationPath('dev/main.js')
    );

    this.fs.copyTpl(
      this.templatePath('dev/template.html'),
      this.destinationPath('dev/template.html')
    );

  }
  installingWebpack(){
    this.yarnInstall();
  }
  myAction(){
    this.log('done');
  }
};
