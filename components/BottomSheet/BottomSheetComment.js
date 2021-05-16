import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RBSheet from "react-native-raw-bottom-sheet";

const BottomSheetComment = ({
    refRBSheet = React.useRef(),
    closeOnDragDown=true,
    closeOnPressMask=false,
    height=400, 
    children,
    dragFromTopOnly=true,
    containerStyle,
    openDuration=350

}) => {

    return (
        <RBSheet
            ref={refRBSheet}
            height={height}
            openDuration={openDuration}
            dragFromTopOnly={dragFromTopOnly}

            customStyles={{
              wrapper: {
                backgroundColor: "transparent"
              },
              draggableIcon: {
                backgroundColor: "#000"
              }
            }}
    
        >
           {children}
        </RBSheet>

    )
}

export default BottomSheetComment

const styles = StyleSheet.create({})
