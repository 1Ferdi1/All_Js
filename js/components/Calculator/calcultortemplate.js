Template.prototype.calculatorTemplate = () => `
  <div>
    <textarea id="a" placeholder="Введите первое значение"></textarea>
    <div class="buttons">
      <button class="operand" data-operand="add">+</button>
      <button class="operand" data-operand="sub">-</button>
      <button class="operand" data-operand="mult">*</button>
      <button class="operand" data-operand="div">/</button>
      <button class="operand" data-operand="pow">^</button>
      <button class="operand" data-operand="prod">prod</button>
      <button id="get-value">get value</button>
    </div>
    <textarea id="b" placeholder="Введите второе значение"></textarea>
    <textarea id="c" placeholder="Результат" readonly></textarea>
  </div>
`;