/* jshint -W030 */

describe('Server:', function() {

  describe('test', function() {

    var hello = 'hello';

    it('should say hello', function() {
      expect(hello).to.exist;
      console.log(hello);
    });

  });
});
