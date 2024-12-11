import React, { useState, useEffect, useMemo } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Members = () => {
    const [selectedTab, setSelectedTab] = useState('Students');
    const [members, setMembers] = useState({ students: [], staff: [], higherAuthorities: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/account/setup');
                if (!response.ok) throw new Error('Failed to fetch members');

                const data = await response.json();
                const categorizedMembers = { students: [], staff: [], higherAuthorities: [] };

                data.forEach(member => {
                    if (member.designation.includes('Student')) {
                        categorizedMembers.students.push(member);
                    } else if (member.designation.includes('Staff Member')) {
                        categorizedMembers.staff.push(member);
                    } else if (member.designation.includes('Higher Authority')) {
                        categorizedMembers.higherAuthorities.push(member);
                    }
                });

                setMembers(categorizedMembers);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    const renderMembers = (membersList) => (
        <tbody>
            {membersList.map((member) => (
                <tr key={member._id} className='border-t border-white text-white'>
                    <td className="py-2 px-2 lg:py-4 lg:px-4">
                        <img 
                            src={`http://localhost:5000/uploads/${member.profilePicture}`} 
                            alt={`${member.firstName}'s Profile`} 
                            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full" 
                        />
                    </td>
                    <td className="py-2 px-2 lg:py-4 lg:px-4">{member.firstName} {member.lastName}</td>
                    <td className="py-2 px-2 lg:px-4 text-left">{member.identityCode}</td>
                    <td className="py-2 px-2 lg:px-4 text-center">{member.phoneNo}</td>
                    <td className="py-2 px-2 lg:px-4 text-center">{member.department}</td>
                </tr>
            ))}
        </tbody>
    );

    const tableContent = useMemo(() => {
        switch (selectedTab) {
            case 'Staff Members':
                return renderMembers(members.staff);
            case 'Higher Authorities':
                return renderMembers(members.higherAuthorities);
            case 'Students':
            default:
                return renderMembers(members.students);
        }
    }, [selectedTab, members]);

    if (loading) {
        return <div className="text-white text-center">Loading members...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">Error: {error}</div>;
    }

    return (
        <section className="px-4 lg:px-6 -mt-8 pb-4 mr-2 lg:mr-6">
            <h2 className="text-white text-2xl font-semibold mb-4">Members</h2>
            <div className="rounded-lg overflow-x-auto lg:ml-5">
                <nav className="flex gap-4 lg:gap-10 mb-4 text-sm lg:text-base">
                    <button 
                        onClick={() => setSelectedTab('Students')} 
                        className={`pb-2 ${selectedTab === 'Students' ? 'text-primaryGreen border-b-2 border-primaryGreen' : 'text-white'} focus:outline-none hover:text-primaryGreen transition`}
                    >
                        Students
                    </button>
                    <button 
                        onClick={() => setSelectedTab('Staff Members')} 
                        className={`pb-2 ${selectedTab === 'Staff Members' ? 'text-primaryGreen border-b-2 border-primaryGreen' : 'text-white'} focus:outline-none hover:text-primaryGreen transition`}
                    >
                        Staff Members
                    </button>
                    <button 
                        onClick={() => setSelectedTab('Higher Authorities')} 
                        className={`pb-2 ${selectedTab === 'Higher Authorities' ? 'text-primaryGreen border-b-2 border-primaryGreen' : 'text-white'} focus:outline-none hover:text-primaryGreen transition`}
                    >
                        Higher Authorities
                    </button>
                </nav>
                <div className='bg-secondaryBlack rounded-xl px-2 lg:px-4 overflow-x-auto'>
                    <table className="w-full text-gray-400 min-w-max overflow-hidden">
                        <thead className="text-primarypurple text-xs lg:text-sm">
                            <tr>
                                <th className="py-2 px-2 lg:py-4 lg:px-4 text-left">Profile</th>
                                <th className="py-2 px-2 lg:py-4 lg:px-4 text-left">Name</th>
                                <th className="py-2 px-2 lg:py-4 lg:px-4 text-left">Identity</th>
                                <th className="py-2 px-2 lg:py-4 lg:px-4 text-center">Contact</th>
                                <th className="py-2 px-2 lg:py-4 lg:px-4 text-center">Department</th>
                            </tr>
                        </thead>
                        {tableContent}
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Members;
