import React from 'react';

function DashboardPage() {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div>Dashboard page</div>
                <div><a href="/logout">Logout</a></div>
            </div>
        </div>
    );
}

export default DashboardPage;