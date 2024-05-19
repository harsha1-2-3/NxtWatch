import React from 'react'

const NxtWatchContext = React.createContext({
  savedVideosList: [],
  onClickSaveBtn: () => {},
  onClickThemeBtn: () => {},
  isDark: false,
  tabsList: [],
})
export default NxtWatchContext
