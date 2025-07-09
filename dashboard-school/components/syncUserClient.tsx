'use client';

import { useEffect } from 'react';

export const SyncUserClient = () => {
    useEffect(() => {
        fetch('/api/sync-user');
    }, []);

    return null;
};
