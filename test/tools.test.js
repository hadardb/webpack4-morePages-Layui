/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-27 16:14:13
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2020-01-27 16:54:54
 */
import { sum } from '../src/libs/tools'

console.log(sum)

test('加法测试', () => {
    expect(sum(1, 2)).toBe(3)
})

test('object assignment', () => {
    const data = { a: 1 }
    data.b = 2
    expect(data).toEqual({
        a: 1,
        b: 2
    })
});

test('adding positive Number is not zero', () => {
    for (let a = 0; a < 10; a++) {
        for (let b = 1; b < 10; b++) {
            expect(a + b).not.toBe(0)
        }
    }
})

test('null', () => {
    const n = null
    expect(n).toBeNull()
    expect(n).toBeDefined()        
    // expect(n).toBeUndefined()  // null 不是undefined
    // expect(n).toBeTruthy()          // null 不是ture
    expect(n).toBeFalsy()
})

test('zero', () => {
    const n = 0
    // expect(n).toBeNull()         // 0 不是null
    expect(n).toBeDefined()
    // expect(n).toBeUndefined()       // 0 不是undefined
    // expect(n).toBeTruthy()       // 0 不是ture
    expect(n).toBeFalsy()
})

const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'beer',
  ];
  
  test('the shopping list has beer on it', () => {
    expect(shoppingList).toContain('beer');
    expect(new Set(shoppingList)).toContain('beer');
  });