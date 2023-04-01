import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./Styles.module.scss";

export function SkeletonDuties() {
	return (
		<SkeletonTheme baseColor="#dddddd" highlightColor="#eeeeee">
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
