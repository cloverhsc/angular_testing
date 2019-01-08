import { MyPipe } from './my.pipe';

describe('MyPipe', () => {
  let pipe: MyPipe;
  beforeEach(() => {
    pipe = new MyPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  // 回傳空字串
  it('should no value returns with empty word.', () => {
    expect(pipe.transform('')).toBe('');
  });

  // 回傳開頭為大寫的字串。
  it('should return A word with UpperCase in first letter', () => {
    expect(pipe.transform('clover')).toBe('Clover');
  });
});
