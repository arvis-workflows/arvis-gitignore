const arvish = require('arvish');
const got = require('got');
const input = arvish.input.toLowerCase();
const fileUrl = 'https://github.com/github/gitignore/blob/master/';

function filter(tree) {
  return tree
    .filter(x => {
      filename = x.path.replace(/Global\//, '')
      return filename.endsWith('.gitignore') &&
        filename.toLowerCase().indexOf(input) >= 0
    })
    .map(x => {
      filename = x.path.replace(/Global\//, '')
      return {
        title: filename,
        arg: fileUrl + x.path
      }
    })
    .sort();
}

const url = 'https://alfred-workflows-62254.firebaseio.com/gi.json'
arvish.fetch(url, {
    maxAge: 86400000, // 24 hours
  })
  .then(items => {
    const output = filter(items);
    arvish.output(output);
  })
  .catch(error => {
    arvish.log(error);
  });

