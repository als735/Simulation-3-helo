import React, {Component} from 'react'; 
import './Dashboard.css'; 
import Nav from '../Nav/Nav';
import Post from './../Post/Post'; 
import { connect } from 'react-redux';
import axios from 'axios';
// import { FIND_USER } from '../../Ducks/reducer'; 

 

class Dashboard extends Component {
    constructor(props){
        super(props); 

        this.state = {
            checkBox : true, 
            searchBox : '',
            listOfPosts : [],
            id : ''
        }
    }

componentDidMount = async () => {
    // await this.getPostings(); 
}

// http://localhost:4000/api/posts/allPosts?userposts=true&search=Toast
getPostings = async () => { // sends an axios request to the endpoint  
    // let {id} = this.state; 
    let res = await axios.get(`/api/posts/allPosts?userposts=${this.state.checkBox}&search=${this.state.searchBox}`) 
            this.setState({
                listOfPosts: res.data
            })
}  // No matter the combination of queries, the request should send the user id from Redux state as a parameter. ? how is this done 

resetSearch = async () => { // reseting the search when the getpostings is hit ? 
    await this.setState({
            searchBox : '', 
            checkBox : true
        })
} 

handleInputChange= (e) => {
    const target = e.target; 
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name; 
    this.setState({
      [name] :value
    }); 
  }
    render(){
        const posts = this.state.listOfPosts.map( (e, i) => {
            return <Post key={i} index={i} post_id={e.post_id} post_title={e.post_title} email={e.email} post_content={e.post_content} profile_picture={e.profile_picture} post_image={e.post_image}/> // 
        })
         
        return(
            <div className='dashboard'>  
                    {this.props.location.pathname !== '/' ? <Nav tologin={()=> {this.props.history.push('/')}}/> : ' '}
                <div className='mainSearchBox'>
                    <div className='searchButtonsBox'>
                        <input name='searchBox' value={this.state.searchBox} onChange={this.handleInputChange} type="text" placeholder='Search by Title' className='searchBox'/>
                        <img className="searchButton" src={searchIcon} onClick={this.getPostings}alt=""/>
                        <button onClick={this.resetSearch} className='resetButton'>Reset</button>
                    </div>
                    <div className='checkBoxDiv'>
                        <label htmlFor="posts">My Posts:</label>
                        <input name='checkBox'type="checkbox" checked={this.state.checkBox} onChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className='postsComp'>
                    {posts}
                </div>
            </div>
        )
    }
}

export default connect(state => state)(Dashboard); 

// export default Dashboard; 




let searchIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAeJJREFUSA2tlM0rBGEcx3dWEREp4oBVrvsXLJEoTsR/QDk6ydt1E2ccuIniKGeEi4MLbY6SAzaRUt5C1uer9pkZM7PM2m99muf5vT0zz/yeJxLxUSaTKYch2IJzeIF7SMECdPikeUzWTwuJI9iSUA0HcAhpKIVm6IEWkG/UsqwUz9yiaAmswScsQ31QBr4uOIEnGAyKM3aCVFjB/caYY0CcXmYVPqA7MBTnCOiN/1Q4W4h4C/Rf9D9qs3bzxKifdwNLxhhiQF4V3MGiJw2juuIN6jzOPxrInYRnKHOlYNBnbbuMISfkx0Dqc6ZGmcRB7Za3aMcLkq9BtYxUXC2nPv6vVMPVvir+Ajog/5VqvDqLqPgVxJzGsGP2uoicBlAtIxXfh15jyW+QIK0CdCXYYtV2kDpta7gRuRtwBpYnE+MeHEOxx/mLgZxW0Oke9g3FEYdHWAHv6r5ZkQixTZCGXdAW+wvnALzDJlT6R9lWYhKgwtKM7QkYEaSrVJfQLYxDozOUeRTaYB20FTuQBGnKGes7JqgG5kHXr3QJR3AKDyDp5+lO+t4KnhMguRYI3F8CdSh0T+tI6+TpgKiP1W7HHPkMTyPiJ5jMwTS+WeMo1EALgOT6gkLVVwdlF9CXFF4sMAapL60vtT4ftHlFAAAAAElFTkSuQmCC'; 