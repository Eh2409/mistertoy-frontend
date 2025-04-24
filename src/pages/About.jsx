
import { BranchList } from '../cmps/BranchList.jsx'
import { GoogleMap } from '../cmps/GoogleMap.jsx'
import { utilService } from '../services/util.service.js'

import { useState, useEffect, useRef, } from 'react'


export function About(props) {

    const [branches, setBranches] = useState([
        {
            _id: utilService.makeId(),
            name: "Branch Tel Aviv",
            phone: "03-555-1234",
            hours: "Sun-Thu: 09:00-20:00, Fri: 09:00-14:00",
            address: "Dizengoff Center, Tel Aviv",
            center: { lat: 32.0758, lng: 34.7749 }
        },
        {
            _id: utilService.makeId(),
            name: "Branch Jerusalem",
            phone: "02-678-4567",
            hours: "Sun-Thu: 10:00-19:00, Fri: 09:00-13:00",
            address: "Malha Mall, Jerusalem",
            center: { lat: 31.7515, lng: 35.1905 }
        },
        {
            _id: utilService.makeId(),
            name: "Branch Haifa",
            phone: "04-837-1122",
            hours: "Sun-Thu: 09:30-20:30, Fri: 09:00-14:00",
            address: "Grand Canyon Mall, Haifa",
            center: { lat: 32.7790, lng: 35.0211 }
        },
        {
            _id: utilService.makeId(),
            name: "Branch Be'er Sheva",
            phone: "08-623-7890",
            hours: "Sun-Thu: 10:00-20:00, Fri: 09:00-13:30",
            address: "BIG Beer Sheva, Be'er Sheva",
            center: { lat: 31.2522, lng: 34.7913 }
        },
        {
            _id: utilService.makeId(),
            name: "Branch Netanya",
            phone: "09-835-6655",
            hours: "Sun-Thu: 09:00-20:00, Fri: 08:30-13:00",
            address: "Ir Yamim Mall, Netanya",
            center: { lat: 32.2782, lng: 34.8503 }
        }
    ])

    const [centerToBranch, setCenterToBranch] = useState(null)

    function onsetCenterToBranch(branchCenter) {
        setCenterToBranch(branchCenter)
    }

    return (
        <section className='about'>
            <h2>About</h2>

            <div className='main-content'>
                <h3>Branches</h3>
                <BranchList branches={branches} onsetCenterToBranch={onsetCenterToBranch} />
                <GoogleMap branches={branches} centerToBranch={centerToBranch} />
            </div>

        </section>)
}