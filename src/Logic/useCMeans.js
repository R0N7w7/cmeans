import { notification } from "antd";
import React from "react";
import { CMeans } from "./CMeans";
import { fuzzyCMeans } from './FuzzyCMeans';


const useCMeans = (initialAlgoritm) => {
    const [centroids, setCentroids] = React.useState([]);
    const [points, setPoints] = React.useState([]);
    const [algoritm, setAlgoritm] = React.useState(initialAlgoritm);

    const cMeansFunction = algoritm == 'fuzzy' ? fuzzyCMeans : CMeans;

    const {
        distanceMatrix,
        membershipMatrix,
        newCentroids,
        costValues,
        costFunction,
    } = cMeansFunction(points, centroids);

    const addPoint = (point) => {
        setPoints([...points, ...point]);
    }

    const addCentroid = (centroid) => {
        setCentroids([...centroids, ...centroid]);
    }

    const onIterate = () => {
        if (!!newCentroids.length && costFunction > 0.0001) {
            setCentroids(newCentroids);
            return 0;
        }

        if (!newCentroids.length || !points.length) {
            notification.error({
                message: 'Error',
                description: 'There are not enough points or centroids to start an iteration of the algorithm!',
                duration: 3,
                placement: 'bottomLeft'
            })
            return
        }
    }

    const onReset = () => {
        setCentroids([]);
        setPoints([]);
    }

    return {
        algoritm, setAlgoritm,
        centroids, setCentroids,
        points, setPoints,
        distanceMatrix,
        membershipMatrix,
        newCentroids,
        costValues,
        costFunction,
        addPoint,
        addCentroid,
        onIterate,
        onReset,
    }
}

export { useCMeans };
