Template.prototype.rpgTemplate = () => `
  <div id="rpg-game">
    <h1 id="room-title"></h1>
    <img id="room-image" width="600px">
    <p id="room-description"></p>
    <div id="exits-container"></div>
    <p>Здоровье: <span id="health">100</span></p>
    <p>Монеты: <span id="coins">0</span></p>
    <div id="food-button-container"></div>
  </div>
`;