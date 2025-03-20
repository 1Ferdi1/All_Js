Template.prototype.graph3DTemplate = () => `
    <canvas id='canvas3D'></canvas>
    <div>
        <label for='printPolygons'>Показать полигоны</label>
            <input type='checkbox' id='printPolygons' checked>
        <label for='printPoint'>Показать точки</label>
            <input type='checkbox' id='printPoint' checked>
        <label for='printEdges'>Показать грани</label>
            <input type='checkbox' id='printEdges' checked>
    </div>
    
    <select id = 'listFigure'>
        <option value = 'cube'> Куб </option>
        <option value = 'cylinder'> Цилиндр </option>
    </select>
`;