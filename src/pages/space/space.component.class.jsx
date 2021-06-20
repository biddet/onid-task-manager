import React from "react";
import { connect } from "react-redux";
import { auth, db } from "../../firebase/firebase.utils";
import { createStructuredSelector } from "reselect";

import Avatar from "../../components/retro/avatar/avatar.component";
import SpaceFly from "../../components/space-fly/space-fly.component";

import { setSpaceData } from "../../redux/space/space.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import "./space.styles.scss";

class Space extends React.Component {
  componentDidMount() {
    this.checkSpace();
  }

  checkSpace = async () => {
    const { setSpaceData } = this.props;
    const current = this.props.currentUser;
    db.collection("space")
      .where("members", "array-contains", current.uid)
      .onSnapshot((snapShot) => {
        if (!snapShot.empty) {
          let shots = [];
          snapShot.forEach((doc) => {
            shots.push(doc.data());
          });
          setSpaceData(shots);
        }
      });
  };
  render() {
    return (
      <div className="space">
        <div className="space__fly">
          <SpaceFly />
        </div>
        <div className="space__user" onClick={() => auth.signOut()}>
          <Avatar src={this.props.currentUser.image} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setSpaceData: (data) => dispatch(setSpaceData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Space);
