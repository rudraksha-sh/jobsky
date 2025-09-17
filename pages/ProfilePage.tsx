import React from 'react';

const StatCard: React.FC<{ label: string, value: string | number, icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex items-center space-x-4">
        <div className="text-primary">{icon}</div>
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-lg font-bold text-white">{value}</p>
        </div>
    </div>
);

const SkillBadge: React.FC<{label: string}> = ({label}) => (
    <span className="bg-primary/10 text-primary-300 text-sm font-medium px-3 py-1.5 rounded-full border border-primary/20">{label}</span>
);


const ProgressChart: React.FC = () => {
    const data = [
        { month: 'Jan', problems: 20 },
        { month: 'Feb', problems: 45 },
        { month: 'Mar', problems: 30 },
        { month: 'Apr', problems: 60 },
        { month: 'May', problems: 80 },
        { month: 'Jun', problems: 75 },
    ];
    const maxProblems = Math.max(...data.map(d => d.problems));

    return (
        <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">Activity</h3>
            <div className="flex items-end justify-between h-48 space-x-2">
                {data.map(item => (
                    <div key={item.month} className="flex-1 flex flex-col items-center justify-end">
                         <div 
                            className="w-full bg-primary rounded-t-md transition-all duration-500 hover:bg-primary-400"
                            style={{ height: `${(item.problems / maxProblems) * 100}%` }}
                            title={`${item.problems} problems solved`}
                         ></div>
                         <p className="text-xs text-gray-400 mt-2">{item.month}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}


export const ProfilePage: React.FC = () => {
    // This is static data. In a real app, it would come from an API.
    const user = {
        name: 'Alex Doe',
        title: 'Aspiring Machine Learning Engineer',
        avatarUrl: `https://api.dicebear.com/8.x/lorelei/svg?seed=alex`,
        stats: {
            problemsSolved: 128,
            roadmapsCompleted: 3,
            communityRank: '#1,204'
        },
        skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'SQL', 'Docker', 'AWS']
    }

    return (
        <div className="container mx-auto p-4 md:p-8 w-full max-w-5xl animate-fade-in-up">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
                <img src={user.avatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-primary-500" />
                <div>
                    <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                    <p className="text-primary-400">{user.title}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard label="Problems Solved" value={user.stats.problemsSolved} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>} />
                <StatCard label="Roadmaps Completed" value={user.stats.roadmapsCompleted} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                <StatCard label="Community Rank" value={user.stats.communityRank} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2">
                    <ProgressChart />
                </div>
                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700">
                    <h3 className="text-lg font-bold text-white mb-4">Top Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {user.skills.map(skill => <SkillBadge key={skill} label={skill} />)}
                    </div>
                </div>
            </div>

        </div>
    );
};