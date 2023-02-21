import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./Styles.module.scss";

export function SkeletonDuties() {
	return (
		<SkeletonTheme baseColor="#222222" highlightColor="#444">
			<div className={styles.title}>
				<h1>
					<Skeleton />
				</h1>
			</div>

			<div className={styles.cards}>
				<Skeleton height={200} />
				<Skeleton height={200} />
				<Skeleton height={200} />
				<Skeleton height={200} />
				<Skeleton height={200} />
				<Skeleton height={200} />
			</div>
		</SkeletonTheme>
	);
}
