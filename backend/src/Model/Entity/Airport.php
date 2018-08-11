<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Airport Entity
 *
 * @property int $id
 * @property int $country_id
 * @property string $name
 * @property string $IATA_code
 * @property float $longitude
 * @property float $latitude
 *
 * @property \App\Model\Entity\Country $country
 */
class Airport extends Entity
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
        'country_id' => true,
        'name' => true,
        'IATA_code' => true,
        'longitude' => true,
        'latitude' => true,
        'country' => true
    ];
}
