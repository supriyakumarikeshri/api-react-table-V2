import React,{Component} from 'react';
import './App.css';
import axios from 'axios';
 
class App extends React.Component {
  constructor() {
    super();
    this.state = {data: [""],filteredData: [""],searchInput:""};
    this.tableHeading = "";
  }
  componentDidMount(){
    axios.get(`http://starlord.hackerearth.com/TopRamen`)
      .then(res => {
            this.setState({
                data: res.data
            });
            const headerData = Object.keys(res.data[0]);
            this.setState({
                tableHeading: headerData 
            });
            
      })
      .catch(error => {
          console.log(error)
      });
  }
  handleChange=(event)=>{
    //search filter based on first td data      
       this.setState({
                  searchInput: event.target.value
             });
      const {tableHeading}=this.state;
      if(event.target.value.length){
               let filteredData = this.state.data.filter((value,key) => {

                return (value[tableHeading[0]].toLowerCase().includes(event.target.value.toLowerCase()));

                });
              this.setState({
                  filteredData: filteredData
             });
    } 
}

  render() {
    const {filteredData,data,searchInput,tableHeading}=this.state;
    const searchplaceHolder=tableHeading ? "Search By "+tableHeading[0] + "......" : "";
    const dataToDisplay = searchInput.length ? filteredData : data;
    const tableHeader = tableHeading && tableHeading.map((val,ind)=>  
                        {
                            return (<th key={ind}>{val}</th>);
                        });
    
    const tableData = dataToDisplay && dataToDisplay.map((rowObj, i) => {
                                   let td = Object.keys(rowObj).map((val, ind) => {
                                        return <td key={ind}>{rowObj[val]}</td>  
                                   })
                                  return ( <tr key={i}>{td}</tr>)
                    }); 
    return (
          <div>
            <input type="text" className="searchbar" onChange={this.handleChange} placeholder={searchplaceHolder} /> 
            <table id="customers">
              <thead>
                  <tr>
                      {tableHeader} 
                   </tr>
               </thead>
               <tbody>
                    {tableData} 
               </tbody>
           </table>
          </div>);  
    
  }
    }


 //{data.map(buildRow)}
 
export default App;
 
