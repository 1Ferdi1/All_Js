Template.prototype.targetTemplate = () => `
  <div>
    <h2>Мишени</h2>
    <label>Количество выстрелов: <input id="count" type="number" value="10"></label><br>
    <label>Случайные координаты: <input id="random" type="checkbox"></label><br>
    <label>X: <input id="x" type="number" value="0"></label>
    <label>Y: <input id="y" type="number" value="0"></label><br>
    <button id="shootButton">Выстрелить</button>
    <h3>Очки: <span id="result">0</span></h3>
  </div>
`;