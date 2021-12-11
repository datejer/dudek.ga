import { useState, useEffect } from 'react';

import styles from './PinnedRepos.module.scss';

export default function PinnedRepos() {
	const [pinned, setPinned] = useState(new Array(6).fill({}));

	useEffect(() => {
		fetch('/api/pinned?username=datejer')
			.then(res => res.json())
			.then(data => setPinned(data));
	}, []);

	return (
		<div className={styles.pinned}>
			{pinned.map((repo, index) => (
				<div className={styles.repoWrapper}>
					<a href={repo.link}>
						<div
							key={index}
							className={styles.repo}
							style={{ borderColor: repo.color }}
						>
							<h2 className={styles.repoName}>
								{repo.owner}/{repo.repo}
							</h2>
							<p className={styles.repoDescription}>{repo.description}</p>
							<div className={styles.repoStats}>
								<div>⭐ {repo.stars}</div>
								<div>🍴 {repo.forks}</div>
							</div>
						</div>
					</a>
				</div>
			))}
		</div>
	);
}
