import { connect } from 'react-redux'
import { search } from '../reducers/filterReducer'
const Filter = (props) => {
    const handleChange = (event) => {
      event.preventDefault()
      let filter = event.target.value
      props.search(filter)
    }
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

  const ConnectedFilter = connect(null, {search})(Filter)

  export default ConnectedFilter