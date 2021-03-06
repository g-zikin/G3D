import Vec3 from "../matrix/vec3";

class Ray {

    public origin = { x: 0, y: 0, z: 0 };
    public direction = { x: 0, y: 0, z: 1 };

    public intersectPlane({ normal, offset }) {
        const dist = this.distanceToPlane({ normal, offset });
        if (dist === null) {
            return null;
        } else {
            const origin = Vec3.fromValues(this.origin.x, this.origin.y, this.origin.z);
            const direction = Vec3.normalize(
                Vec3.create(),
                Vec3.fromValues(this.direction.x, this.direction.y, this.direction.z),
            );
            const theOffset = Vec3.scale(Vec3.create(), direction, dist);
            const point = Vec3.add(
                Vec3.create(),
                origin,
                theOffset,
            );
            return {
                x: point[0],
                y: point[1],
                z: point[2],
            };
        }
    }

    public distanceToPlane({ normal, offset }) {

        normal = Vec3.normalize(Vec3.create(), Vec3.fromValues(normal.x, normal.y, normal.z));
        const origin = Vec3.fromValues(this.origin.x, this.origin.y, this.origin.z);
        const direction = Vec3.normalize(
            Vec3.create(),
            Vec3.fromValues(this.direction.x, this.direction.y, this.direction.z),
        );

        const denominator = Vec3.dot(normal, direction);

        if (denominator === 0) {
            return null;
        }

        const t = -(Vec3.dot(origin, normal) - offset) / denominator;

        return t > 0 ? t : null;
    }

}

export default Ray;
