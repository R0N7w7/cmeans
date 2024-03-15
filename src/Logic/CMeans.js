//Calcula la matriz de distancias entre una lista de puntos y una lista de centroides
export const getDistanceMatrix = (points, centroids) => {
    // Verificar si las matrices de entrada no están vacías
    if (points.length === 0 || centroids.length === 0) {
        return [];
    }

    const distanceMatrix = [];

    //recorre la matriz y calcula la distancia de cada punto a cada centroide
    for (let i = 0; i < centroids.length; i++) {
        const distancesRow = [];
        for (let j = 0; j < points.length; j++) {
            const newDistance = euclidianDistance(centroids[i], points[j]);
            distancesRow.push(newDistance);
        }
        distanceMatrix.push(distancesRow);
    }
    return distanceMatrix;
}


//Calcula la distancia euclidiana entre dos puntos dados
export const euclidianDistance = (pointA, pointB) => {
    const distance = Math.sqrt(Math.pow((pointA.x - pointB.x), 2) + Math.pow((pointA.y - pointB.y), 2));
    return distance;
}


//Calcula la matriz de pertenencia dada una matriz de distancias
export const getMembershipMatrix = (distanceMatrix) => {
    //Verifica que la matriz de distancia no esté vacía
    if (distanceMatrix.length === 0) {
        return [];
    }

    //Genera una matriz de puros ceros con las mismas dimensiones que la matriz de distancia
    const membershipMatrix = [...zeroMatrix(distanceMatrix)];

    for (let j = 0; j < distanceMatrix[0].length; j++) {

        let min = distanceMatrix[0][j];
        let minPosition = 0;

        for (let i = 0; i < distanceMatrix.length; i++) {
            if ((distanceMatrix[i][j] < min)) {
                min = distanceMatrix[i][j];
                minPosition = i;
            }
        }
        membershipMatrix[minPosition][j] = 1;

    }
    return membershipMatrix;
}

//construye una matriz de puros 0 con las misma dimensiones de una matriz dada
export function zeroMatrix(matrix) {
    // Obtenemos el número de filas y columnas de la matriz.
    const rows = matrix.length;
    const columns = matrix[0].length;
    const newMatrix = [];
    for (let i = 0; i < rows; i++) {
        const newMatrixRow = []
        for (let j = 0; j < columns; j++) {
            newMatrixRow.push(0);
        }
        newMatrix.push(newMatrixRow);
    }
    return newMatrix;
}

//Genera los nuevos centroides
export const getNewCentroids = (points, membershipMatrix) => {
    const newCentroids = [];
    for (let i = 0; i < membershipMatrix.length; i++) {
        let sumaX = 0;
        let sumaY = 0;
        let cardinalidad = 0;

        //Recorre la matriz de pertenencia y va sumando las coordenadas x,y de cada putno perteneciente al centroide
        //Tambien calcula la cantidad de puntos pertenecientes a cada punto.
        for (let j = 0; j < membershipMatrix[0].length; j++) {
            if (membershipMatrix[i][j] == 1) {
                sumaX += points[j].x;
                sumaY += points[j].y;
                cardinalidad++;
            }
        }
        const x = sumaX / cardinalidad;
        const y = sumaY / cardinalidad;

        if (cardinalidad !== 0) {
            newCentroids.push({ x, y });    
        }
    }
    return newCentroids;
}

//Calcula los valores de costo para cada punto agrupado a un centroide
export const getCostValues = (membershipMatrix, distanceMatrix) => {

    //Verifica que las matrices no estén vacías
    if (membershipMatrix.length == 0 || distanceMatrix.length == 0) {
        return [];
    }
    const costValues = [];

    //Recorre cada posicion de la matriz de pertenencia
    //Cuando encuentra un 1, entonces acumula el valor de esa posicion, pero de la matriz de distancia
    for (let i = 0; i < membershipMatrix.length; i++) {
        let costValue = 0;
        for (let j = 0; j < membershipMatrix[0].length; j++) {
            if (membershipMatrix[i][j] == 1) {
                costValue += distanceMatrix[i][j];
            }
        }
        costValues.push(costValue);
    }

    //Devuelve un array con los valores de costo por centroide
    return costValues;
}

//Devuelve el costo total de los valores de costo, recibe un array de costos individuales
export const getCostFunction = costValues => costValues.length != 0 ? costValues.reduce((sum, costValue) => (sum + costValue)) : 0;

//Manda a llamar en orden los pasos pertinentes para realizar una iteracion del algoritmo
export const CMeans = (points, centroids) => {
    const distanceMatrix = getDistanceMatrix(points, centroids);
    const membershipMatrix = getMembershipMatrix(distanceMatrix);
    const newCentroids = getNewCentroids(points, membershipMatrix);
    const costValues = getCostValues(membershipMatrix, distanceMatrix);
    const costFunction = getCostFunction(costValues);

    //Se retorna un objeto con los resultados de los pasos especificados
    return {
        distanceMatrix,
        membershipMatrix,
        newCentroids,
        costValues,
        costFunction,
    }
}



//Utilities

//Genera n cnatidad de puntos
export function generateRandomPoints(n) {
    const points = [];
    for (let i = 0; i < n; i++) {
        const point = {
            x: Math.floor(Math.random() * 201) - 100,
            y: Math.floor(Math.random() * 201) - 100,
        };
        points.push(point);
    }
    return points;
}



