import React from 'react'
import { useParams } from 'react-router-dom';

interface RfqDetailPageProps {
    rfqId: string;
}

export default function RfqDetailPage() {
    const { rfqId } = useParams<RfqDetailPageProps>();
    return (
        <div>
            detail page
            {rfqId}
        </div>
    )
}
