import {HomePageButtons} from './HomePageButtons'
import {HeaderBar} from '../SharedComponents/HeaderBar'
import './HomePage.css'
export function HomePage(){
  return(
    <>
      <div className="container">
        <HeaderBar title = "Home"/>
        <HomePageButtons/>
      </div>
    </>
    )
}