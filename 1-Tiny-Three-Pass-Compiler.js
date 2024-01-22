//https://www.codewars.com/kata/5265b0885fda8eac5900093b

function Compiler() {};

Compiler.prototype.compile = function(program) {
  return this.pass3(this.pass2(this.pass1(program)));
};

Compiler.prototype.pass1 = function(program) {
  var tokens = program.match(/[-+*/\(\)\[\]]|[A-Za-z]+|[0-9]+/g);
  var args = {};

  accept('[');
  for (var v, i = 0; v = accept(/[a-z]+/); args[v] = i++);
  accept(']');
  return expression();
  
  function accept(sym)  { return (sym instanceof RegExp ? sym.test(tokens[0]) : sym == tokens[0]) && tokens.shift(); }
  function expression() { for (var o, e = term(); o = accept(/\+|-/); e = { op: o, a: e, b: term() }); return e; }
  function term()       { for (var o, t = factor(); o = accept(/\*|\//); t = { op: o, a: t, b: factor() }); return t; }
  function factor(e)    { return accept('(') ? (e = expression(), accept(')'), e) : number() || variable(); }
  function number(n)    { return (n = accept(/\d+/)) && { op: 'imm', n: +n }; }
  function variable(v)  { return (v = accept(/[a-z]+/)) && { op: 'arg', n: args[v] }; }
};

Compiler.prototype.pass2 = function optimize(ast) {
  if ('n' in ast)
    return ast;
  var a = optimize(ast.a), b = optimize(ast.b);
  if (a.op == 'imm' && b.op == 'imm')
    return { op: 'imm', n: eval(a.n + ast.op + b.n) };
  return { op: ast.op, a: a, b: b };
};

Compiler.prototype.pass3 = function translate(ast) {
  if (ast.op == 'imm')
    return [ 'IM ' + ast.n ];
  else if (ast.op == 'arg')
    return [ 'AR ' + ast.n ];
  else
    return Array.prototype.concat.call([],
      translate(ast.a), 'PU',
      translate(ast.b), 'SW', 'PO',
      [ 'SU', 'DI', 'MU', 'AD' ]['-/*+'.indexOf(ast.op)]);
};