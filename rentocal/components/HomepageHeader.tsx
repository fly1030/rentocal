import { PageHeader } from 'antd'

type Props = {};

function HomepageHeader(props: Props) {
	return (
		<div style={{backgroundColor: '#173F5F'}}>
			<PageHeader
				ghost={true}
				title={<h1 style={{marginTop: 8}}>Rentocal</h1>}
				extra={null}
			/>
		</div>
	)
}

export default HomepageHeader