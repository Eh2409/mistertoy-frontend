import { useState, useEffect, useRef } from 'react'
import { toyService } from '../services/toy.service.remote.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { DoughnutChart } from '../cmps/charts/DoughnutChart.jsx'
import { BarChart } from '../cmps/charts/BarChart.jsx'
import { Loader } from '../cmps/Loader.jsx'


export function Dashboard() {

    const [chartsData, setChartsData] = useState(null)

    useEffect(() => {
        loadChartsData()
    }, [])

    async function loadChartsData() {
        try {
            const data = await toyService.getCahrtsData()
            setChartsData(data)
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot load charts data')
        }
    }

    if (!chartsData) return <Loader />
    const { byBrands, byManufacturers, byTypes, byReleaseYear } = chartsData

    return (
        <section className='dashboard'>
            <h2>Dashboard</h2>
            <ul className='charts-list'>
                <li>
                    <h3>Toys By Brands</h3>
                    <DoughnutChart labelData={byBrands} />
                </li>
                <li>
                    <h3>Toys By Manufacturers</h3>
                    <DoughnutChart labelData={byManufacturers} />
                </li>
                <li>
                    <h3>Toys By Types</h3>
                    <DoughnutChart labelData={byTypes} />
                </li>
                <li>
                    <h3>Toys By Release Year</h3>
                    <div className='chart-bar'>
                        <BarChart labelData={byReleaseYear} />
                    </div>
                </li>
            </ul>
        </section>
    )
}

