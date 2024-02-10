import React from 'react'
import { sectionWidth } from '../styles'
import { DarkContext } from '../App'
import { useContext } from 'react'

const Error = () => {
    const { darkMode } = useContext(DarkContext)
    return (
        <div className={`${sectionWidth} flex flex-col h-[90svh] justify-center py-8 items-center gap-8 ${darkMode == false && "text-light"}`}>
            <div className='text-center flex flex-col gap-4'>
                <div><img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/undraw_undraw_undraw_undraw_undraw_undraw_undraw_search_engines_041x_-2-_cl95_o7o8_pigd_-1-_wbm3_t5p8_-1-_mt5l_(2)_dhxr.svg" alt="" className="w-[300px]" /></div>
                <span>Page Not Found</span>
            </div>
        </div>
    )
}

export default Error