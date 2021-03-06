let NewForm = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    event_date: React.PropTypes.string,
    place: React.PropTypes.string,
    description: React.PropTypes.string
  },

  getInitialState: function () {
    return {
      name: '',
      place: '',
      event_date: '',
      description: ''
    }
  },

  handleAdd: function (e) {
    e.preventDefault();
    let self = this;

    if (this.validForm()) {
      $.ajax({
        url: '/api/events',
        method: 'POST',
        data: {event: self.state},

        success: function () {
          self.props.handleAdd();
          self.setState(self.getInitialState());
        },

        error: function (xhr, status, error) {
          alert('Cannot add a new record: ' + error);
        }
      })
    } else {
      alert('Please fill all fields.');
    }
  },

  validForm: function () {
    if (this.state.name && this.state.place && this.state.event_date && this.state.description) {
      return true;
    } else {
      return false;
    }
  },

  handleChange: function (e) {
    let input_name = e.target.name;
    let value = e.target.value;

    this.setState({[input_name]: value});
  },

  render: function () {
    return (
      <form className="form-inline" onSubmit={this.handleAdd}>
        <div className="input-group styled-field m-r-sm m-b-xs">
          <div className="input-group-addon">
            <span className="glyphicon glyphicon-tag" aria-hidden="true"/>
          </div>

          <input type="text"
                 className="form-control"
                 name="name"
                 placeholder="Name"
                 ref="name"
                 value={this.state.name}
                 onChange={this.handleChange}/>
        </div>

        <div className="input-group styled-field m-r-sm m-b-xs">
          <div className="input-group-addon">
              <span className="glyphicon glyphicon-map-marker" aria-hidden="true"/>
          </div>

          <input type="text"
                 className="form-control"
                 name="place"
                 placeholder="Place"
                 ref="place"
                 value={this.state.place}
                 onChange={this.handleChange}/>
        </div>

        <div className="input-group styled-field m-r-sm m-b-xs">
          <div className="input-group-addon">
            <span className="glyphicon glyphicon-time" aria-hidden="true"/>
          </div>

          <input type="date"
                 className="form-control"
                 name="event_date"
                 placeholder="Event date"
                 ref="event_date"
                 value={this.state.event_date}
                 onChange={this.handleChange}/>
        </div>

        <div className="input-group styled-field m-r-sm m-b-xs">
          <div className="input-group-addon">
            <span className="glyphicon glyphicon-info-sign" aria-hidden="true"/>
          </div>

          <input type="text"
                 className="form-control"
                 name="description"
                 placeholder="Description"
                 ref="description"
                 value={this.state.description}
                 onChange={this.handleChange}/>
        </div>

        <button type="submit" className="btn btn-action m-b-xs">
          <span className="glyphicon glyphicon-plus m-r-xs" aria-hidden="true"/>
          Add Event
        </button>
      </form>
    )
  }
});
