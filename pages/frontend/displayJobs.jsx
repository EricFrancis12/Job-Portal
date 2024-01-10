'use client';

import NavBar from '@/components/NavBar';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import JobsCard from '@/components/JobsCard'
import Pagination, { filterByCurrentPage, calcTotalNumPages } from '@/components/Pagination';
import { placeholderJobs } from '@/DB/placeholder-data';



export default function DisplayJobs() {
    // const JobData = useSelector(state => state?.Job?.JobData) || [];
    const JobData = placeholderJobs; // un-comment to use placeholder job data for testing purposes

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredJobData = JobData.filter(job => (
        job.title.includes(searchQuery)
        || job.description.includes(searchQuery)
        || job.company.includes(searchQuery)
    ));

    const totalNumPages = calcTotalNumPages(filteredJobData, 3);

    useEffect(() => setCurrentPage(1), [searchQuery]);

    return (
        <>
            <NavBar />
            <div className='w-full  py-20 flex items-center md:px-8 px-2  justify-center flex-col'>
                <h1 className='px-4 mx-2 py-2 uppercase tracking-wider border-b-2 border-b-indigo-600 text-3xl font-semibold'>Available Jobs</h1>
                <div>
                    <input
                        type='text'
                        placeholder='search...'
                        className='my-4 px-2'
                        style={{
                            border: 'solid 1px black',
                            borderRadius: '8px'
                        }}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className='w-full h-full py-4 flex  overflow-y-auto  items-center justify-center flex-wrap'>
                    {/* map */}
                    {
                        Array.isArray(filteredJobData) && filteredJobData.length > 0
                            ? filterByCurrentPage(filteredJobData, currentPage, 3)?.map((job) => {
                                return (
                                    <JobsCard job={job} key={job?._id} />
                                )
                            }) : <p>No jobs found</p>
                    }
                    {/* map */}
                </div>
                <div
                    className='w-[50%]'
                    style={{
                        borderTop: 'solid 1px black'
                    }}
                >
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalNumPages={totalNumPages}
                    />
                </div>
            </div>
        </>
    )
}
