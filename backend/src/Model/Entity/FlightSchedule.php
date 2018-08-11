<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * FlightSchedule Entity
 *
 * @property int $airline_id
 * @property int $depart_airport_id
 * @property int $arrive_airport_id
 *
 * @property \App\Model\Entity\Airline $airline
 * @property \App\Model\Entity\Airport $airport
 */
class FlightSchedule extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        'airline' => true,
        'airport' => true
    ];
}
