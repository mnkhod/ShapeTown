import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstHarvestAchievement: false,
    giftFromNatureAchievement: false,
    firstFishAchievement: false,
    naturalForagerAchievement: false,
    tasteOfGoldAcheivement: false,
}

export const achievementSlice = createSlice({
    name: 'achievement',
    initialState,
    reducers: {
        setFirstHarvestAchievement: (state) => {
            state.firstHarvestAchievement = true
        },
    },
})

export const { setFirstHarvestAchievement } = achievementSlice.actions


export const store = configureStore({
    reducer: {
        achievement: achievementSlice.reducer
    },
})