import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./Styles.module.scss";

export function HomePage() {
	return (
		<SkeletonTheme baseColor="#222222" highlightColor="#444">
			<div className={styles.title}>
				<h1>
					<Skeleton />
				</h1>
			</div>

			<div className={styles.cards}>
				<Skeleton height={150} />
				<Skeleton height={150} />
			</div>

			<div className={styles.address}>
				<h1>
					<Skeleton width="60%" />
				</h1>

				<p>
					<Skeleton width="30%" />
					<Skeleton width="40%" />
				</p>

				<p>
					<Skeleton width="30%" />
					<Skeleton width="45%" />
				</p>
			</div>

			<div>
				<Skeleton height={40} />
			</div>
		</SkeletonTheme>
	);
}
