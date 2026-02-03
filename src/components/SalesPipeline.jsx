import React from 'react';

function SalesPipeline({ salesData }) {
    const stages = ['lead', 'qualification', 'proposal', 'negotiation', 'closed-won'];
    const stageLabels = {
        'lead': 'Lead',
        'qualification': 'Qualified',
        'proposal': 'Proposal',
        'negotiation': 'Negotiation',
        'closed-won': 'Closed Won'
    };

    const pipelineData = stages.map(stage => {
        const stageDeals = salesData.filter(deal => deal.stage === stage);
        const stageValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
        return {
            stage: stageLabels[stage],
            count: stageDeals.length,
            value: stageValue
        };
    });

    // Find and separate the Qualified stage
    const qualifiedStage = pipelineData.find(stage => stage.stage === 'Qualified');
    const otherStages = pipelineData.filter(stage => stage.stage !== 'Qualified');

    return (
        <div className="card" data-name="sales-pipeline" data-file="components/SalesPipeline.jsx">
            <h3 className="text-lg font-semibold mb-4">Sales Pipeline</h3>
            {/* Qualified stage at the top */}
            {qualifiedStage && (
                <div className="pipeline-stage">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-[var(--text-primary)]">{qualifiedStage.stage}</span>
                        <span className="text-sm text-[var(--text-secondary)]">{qualifiedStage.count} deals</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold text-[var(--primary-color)]">
                            ${qualifiedStage.value.toLocaleString()}
                        </div>
                        <div className="w-4 h-4 rounded-full bg-[var(--primary-color)]"></div>
                    </div>
                </div>
            )}
            {/* Other stages */}
            <div className="space-y-4">
                {otherStages.map((stage, index) => (
                    <div key={stage.stage} className="pipeline-stage">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-[var(--text-primary)]">{stage.stage}</span>
                            <span className="text-sm text-[var(--text-secondary)]">{stage.count} deals</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-lg font-semibold text-[var(--primary-color)]">
                                ${stage.value.toLocaleString()}
                            </div>
                            <div className="w-4 h-4 rounded-full bg-[var(--primary-color)]"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SalesPipeline;
