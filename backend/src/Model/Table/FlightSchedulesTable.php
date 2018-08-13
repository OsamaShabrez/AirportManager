<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * FlightSchedules Model
 *
 * @property \App\Model\Table\AirlinesTable|\Cake\ORM\Association\BelongsTo $Airlines
 * @property \App\Model\Table\AirportsTable|\Cake\ORM\Association\BelongsTo $Airports
 * @property \App\Model\Table\AirportsTable|\Cake\ORM\Association\BelongsTo $Airports
 *
 * @method \App\Model\Entity\FlightSchedule get($primaryKey, $options = [])
 * @method \App\Model\Entity\FlightSchedule newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\FlightSchedule[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\FlightSchedule|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\FlightSchedule|bool saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\FlightSchedule patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\FlightSchedule[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\FlightSchedule findOrCreate($search, callable $callback = null, $options = [])
 */
class FlightSchedulesTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('flight_schedules');
        $this->setDisplayField('airline_id');
        $this->setPrimaryKey(['airline_id', 'depart_airport_id', 'arrive_airport_id']);

        $this->belongsTo('Airlines', [
            'foreignKey' => 'airline_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('DepartAirport', [
            'className' => 'Airports',
            'foreignKey' => 'depart_airport_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('ArriveAirport', [
          'className' => 'Airports',
            'foreignKey' => 'arrive_airport_id',
            'joinType' => 'INNER'
        ]);
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */
    public function buildRules(RulesChecker $rules)
    {
        $rules->add($rules->existsIn(['airline_id'], 'Airlines'));
        $rules->add($rules->existsIn(['depart_airport_id'], 'DepartAirport'));
        $rules->add($rules->existsIn(['arrive_airport_id'], 'ArriveAirport'));

        return $rules;
    }
}
