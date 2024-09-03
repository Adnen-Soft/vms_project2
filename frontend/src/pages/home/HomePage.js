import { useState } from 'react';
import { Chart } from 'primereact/chart';
import { DataSource } from 'components/DataSource';
import { Title } from 'components/Title';

export default function HomePage() {
	
	const [pageReady, setPageReady] = useState(true);
	return (
		<main id="HomePage" className="main-page">
<section className="page-section q-pa-md" >
    <div className="container-fluid">
        <div className="grid ">
            <div className="col comp-grid" >
                <Title title="Home"   titleClass="text-lg font-bold text-primary" subTitleClass="text-500"      separator={false} />
            </div>
        </div>
    </div>
</section>
<section className="page-section mb-3" >
    <div className="container-fluid">
        <div className="grid ">
            <div className="sm:col-12 lg:col-6 md:col-6 comp-grid" >
                <div className="card nice-shadow-1 s">
                    <div className="q-pa-md">
                        <div className="font-bold text-lg">Kilometrage</div>
                        <div className="text-500"></div>
                        <hr />
                        <div className="row q-col-gutter-sm">
                            <div className="col">
                                <DataSource   apiPath="components_data/barchart_kilometrage"  >
                                    {
                                    ({ response }) => 
                                    <>
                                    <Chart data={response} type="bar" options={{
                                    scales: {
                                    y: {
                                    title: {
                                    display: true,
                                    text: "kilo"
                                    }
                                    },
                                    x: {
                                    title: {
                                    display: true,
                                    text: "voiture"
                                    }
                                    }
                                    }
                                    }
                                    }  />
                                    </>
                                    }
                                </DataSource>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-6 col-md-6 sm:col-12 lg:col-6 md:col-6 comp-grid" >
                <div className="card nice-shadow-1 s">
                    <div className="q-pa-md">
                        <div className="font-bold text-lg">Comsommation de carburant</div>
                        <div className="text-500"></div>
                        <hr />
                        <div className="row q-col-gutter-sm">
                            <div className="col">
                                <DataSource   apiPath="components_data/barchart_comsommationdecarburant"  >
                                    {
                                    ({ response }) => 
                                    <>
                                    <Chart data={response} type="bar" options={{
                                    scales: {
                                    y: {
                                    title: {
                                    display: true,
                                    text: ""
                                    }
                                    },
                                    x: {
                                    title: {
                                    display: true,
                                    text: ""
                                    }
                                    }
                                    }
                                    }
                                    }  />
                                    </>
                                    }
                                </DataSource>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
		</main>
	);
}
