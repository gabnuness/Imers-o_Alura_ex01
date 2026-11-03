import test from 'node:test';
import assert from 'node:assert/strict';
import {
  adicao,
  subtracao,
  multiplicacao,
  divisao,
  porcentagem,
  executarCalculo,
  ZeroDivisionError,
} from './calculator';

test('adicao: soma dois números corretamente', () => {
  assert.equal(adicao(5, 3), 8);
  assert.equal(adicao(-10, 4), -6);
  assert.equal(adicao(0.1, 0.2).toFixed(2), '0.30');
});

test('subtracao: subtrai dois números corretamente', () => {
  assert.equal(subtracao(10, 4), 6);
  assert.equal(subtracao(5, 10), -5);
  assert.equal(subtracao(0, 0), 0);
});

test('multiplicacao: multiplica dois números corretamente', () => {
  assert.equal(multiplicacao(7, 6), 42);
  assert.equal(multiplicacao(-3, 5), -15);
  assert.equal(multiplicacao(0, 999), 0);
});

test('divisao: divide dois números corretamente', () => {
  assert.equal(divisao(20, 4), 5);
  assert.equal(divisao(7, 2), 3.5);
  assert.equal(divisao(-10, 2), -5);
});

test('divisao: lanca ZeroDivisionError se divisor for zero', () => {
  assert.throws(
    () => divisao(10, 0),
    (err: unknown) => err instanceof ZeroDivisionError && err.message.includes('ZeroDivisionError')
  );
});

test('porcentagem: calcula porcentagem de um valor corretamente', () => {
  assert.equal(porcentagem(200, 15), 30);
  assert.equal(porcentagem(50, 10), 5);
  assert.equal(porcentagem(100, 0), 0);
});

test('executarCalculo: retorna objeto formatado e trata divisao por zero graciosamente', () => {
  const sucesso = executarCalculo(12, 3, 'divisao');
  assert.equal(sucesso.result, 4);
  assert.equal(sucesso.error, undefined);

  const pct = executarCalculo(200, 15, 'porcentagem');
  assert.equal(pct.result, 30);
  assert.equal(pct.symbol, '%');

  const erroZero = executarCalculo(10, 0, 'divisao');
  assert.equal(erroZero.result, null);
  assert.ok(erroZero.error?.includes('ZeroDivisionError'));
});
