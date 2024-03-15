import { CmeanForm } from "./CmeanForm";
import { Matrix } from "./Matrix";
import { PointTable } from "./PointTable";
import { ScatterChart } from "./components/ScatterChart";

import { useCMeans } from "./Logic/useCMeans";
import ButtonGroup from "./components/ButtonGroup";
import { PointForm } from "./pointForm";

import { Switch } from 'antd';



function App() {

  const {
    algoritm, setAlgoritm,
    centroids,
    points,
    distanceMatrix,
    membershipMatrix,
    costFunction,
    addPoint,
    addCentroid,
    onIterate,
    onReset,
  } = useCMeans('fuzzy');

  function handleAlgoritm(checked) {
    if (!!checked) {
      setAlgoritm('fuzzy');
    } else {
      setAlgoritm('no-fuzzy');
    }
  }

  return (
    <div className="app">
      <div className="form-graph">
        <div className="inputs">
          <CmeanForm>
            <PointForm
              name={'Point'}
              action={addPoint}
            />
            <PointForm
              name={'Centroid'}
              action={addCentroid}
            />
          </CmeanForm>
          <div className="tables">
            <PointTable
              name={'Points'}
              points={points}
            />
            <PointTable
              name={'Centroids'}
              points={centroids}
            />
          </div>
        </div>

        <ButtonGroup
          onReset={onReset}
          onIterate={onIterate}
          costFunction={costFunction}
        />

        <Switch
          checkedChildren="Fuzzy C-Means"
          unCheckedChildren="C-Means"
          defaultChecked
          onChange={(checked) => handleAlgoritm(checked)}
        />

        <ScatterChart
          className={'graph'}
          points={points}
          centroids={centroids}
        />
      </div>
      <div className="process">
        <Matrix
          matrix={distanceMatrix}
          name={'Distance Matrix'}
        />
        <Matrix
          matrix={membershipMatrix}
          name={'Membership Matrix'}
        />
      </div>
    </div>
  )
}

export default App