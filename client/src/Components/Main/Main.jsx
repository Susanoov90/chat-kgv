import LeftMain from "./LeftMain/LeftMain";
import RightMain from "./RightMain/RightMain";
import MiddleMain from "./MiddleMain/MiddleMain";
// import { useParams } from 'react-router-dom';

import './Main.scss'

function Main() {
    // const {id} = useParams();

    // console.log("Id Params", id)
    return (
        <div className='Main d-flex'>
            <LeftMain />

            <MiddleMain />

            {/* <RightMain /> */}
        </div>
    );
}

export default Main;
