import { createStore } from "redux";

const DRUMPAD = "DRUMPAD";
const POWER = "POWER";
const BANK = "BANK";
const VOL = "VOL";

const handleKey = (L) => ({
  type: DRUMPAD
  , key: L
})

const handlePower = () => ({
  type: POWER
})
const handleBank = () => ({
  type: BANK
})
const handleVol = (e) => ({
  type: VOL
  , vol: e.target.value
})

const initialState = {
  currentAction: "Play!"
  , power: true
  , bank: false
  , vol: 50
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case(DRUMPAD)
    : return Object.assign({}, state, {currentAction: action.key})
    case(POWER)
    : return Object.assign({}, state, {power: !state.power})
    case(BANK)
    : return Object.assign({}, state, 
      {
        bank: !state.bank
        , currentAction:(
          state.bank
          ? "SOUNDS1"
          : "SOUNDS2"
          )
      }
    )
    case(VOL)
    : return Object.assign({}, state, 
      {
        vol: action.vol
        , currentAction: `Volume: ${action.vol}`
      })
    default
    : return state
  }
}
export const store = createStore(reducer);
export const mapS2P = (state) => ({
  currentAction: state.currentAction
  , bank: state.bank
  , power: state.power
  , volume: state.vol
});
export const mapD2P = (dispatch) => ({
  handleKey: (L) => dispatch(handleKey(L))
  , handlePower: () => dispatch(handlePower())
  , handleBank: () => dispatch(handleBank())
  , handleVol: (e) => dispatch(handleVol(e))
})